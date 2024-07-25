import React, {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
  RefObject,
} from "react";
import { AuthContext } from "./AuthContext";
import { getUserData } from "../lib/getUserData";
import { getLinks } from "../lib/getLinks";
import { saveLinks } from "../lib/saveLinks";
import { getUserInfo } from "../lib/getUserInfo";
import { saveUserInfo } from "../lib/saveUserInfo";
import { uploadImg } from "../lib/uploadImg";
import {
  Link,
  UserInfo,
  PlatformType,
  DataContextType,
  AuthContextType,
} from "../types";

const blankLink: Omit<Link, "id" | "listIndex"> = {
  platform: "GitHub" as PlatformType,
  linkUrl: "",
  inputRef: null,
};

const blankUser: UserInfo = {
  firstName: "",
  lastName: "",
  email: "",
  profileImg: "",
};

export const DataContext = createContext<DataContextType>(
  {} as DataContextType,
);

export default function DataProvider({ children }: { children: ReactNode }) {
  const { user } = useContext(AuthContext) as AuthContextType;

  const [links, setLinks] = useState<Link[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo>(blankUser);
  const [slug, setSlug] = useState("");
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);
  const [imgPreviewPath, setImgPreviewPath] = useState("");

  const addLink = () => {
    setLinks((prevLinks) => [
      ...prevLinks,
      {
        ...blankLink,
        id: crypto.randomUUID(),
        listIndex: prevLinks.length,
      } as Link,
    ]);
  };

  const removeLink = (id: string) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const updateLink = (updatedLink: Link) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === updatedLink.id ? updatedLink : link,
      ),
    );
  };

  const addRef = (id: string, ref: RefObject<HTMLInputElement>) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) =>
        link.id === id ? { ...link, inputRef: ref } : link,
      ),
    );
  };

  const loadLinks = async () => {
    if (user) {
      const links = await getLinks(user.id);
      setLinks(links);
    }
  };

  const saveLinksToDb = async () => {
    if (user) {
      await saveLinks(user.id, links);
      loadLinks();
      return null;
    }
    return null;
  };

  const reorderLinks = (targetId: string, newIdx: number) => {
    const targetLink = links.find((link) => link.id === targetId);
    if (!targetLink) return;

    const otherLinks = links.filter((link) => link.id !== targetId);
    const reorderedLinks = [
      ...otherLinks.slice(0, newIdx),
      targetLink,
      ...otherLinks.slice(newIdx),
    ];

    setLinks(
      reorderedLinks.map((link, idx) => ({
        ...link,
        listIndex: idx,
      })),
    );
  };

  const updateUserInfo = (field: keyof UserInfo, value: string) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const updateFirstName = (value: string) => {
    updateUserInfo("firstName", value);
  };

  const updateLastName = (value: string) => {
    updateUserInfo("lastName", value);
  };

  const updateEmail = (value: string) => {
    updateUserInfo("email", value);
  };

  const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files;
    if (!images || images.length === 0) return;

    const newImg = images[images.length - 1];
    setUploadedImg(newImg);
    setImgPreviewPath(URL.createObjectURL(newImg));
  };

  const loadUserInfo = async () => {
    if (user) {
      const userInfo = await getUserInfo(user.id);
      if (userInfo) {
        setUserInfo(userInfo);
      }
    }
  };

  const saveUserInfoToDb = async () => {
    if (user) {
      const profileImgPath = uploadedImg
        ? await uploadImg(user.id, uploadedImg)
        : userInfo.profileImg;

      await saveUserInfo(user.id, {
        ...userInfo,
        profileImg: profileImgPath || "",
      });

      loadUserInfo();
      return null;
    }
    return null;
  };

  const value: DataContextType = {
    links,
    userInfo,
    slug,
    imgPreviewPath,
    addLink,
    removeLink,
    updateLink,
    addRef,
    reorderLinks,
    updateUserInfo,
    previewImg,
    saveLinksToDb,
    saveUserInfoToDb,
    updateFirstName,
    updateLastName,
    updateEmail,
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (user?.id) {
        const data = await getUserData(user.id);
        if (!data) return;

        const { userInfo, links, slug } = data;
        setUserInfo(userInfo);
        setLinks(links);
        setSlug(slug);
      }
    };

    if (user) {
      loadUserData();
    }
  }, [user]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
