"use client";
import { createContext, useContext } from "react";
import { Lang } from "@/lib/translations";

export const LangContext = createContext<Lang>("KO");
export const useLang = () => useContext(LangContext);