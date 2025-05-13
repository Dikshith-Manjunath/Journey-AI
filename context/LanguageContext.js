"use client";
import React, { createContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const LanguageProvider = ({ children }) => {
 const [language, setLanguage] = useState('en');

 useEffect(() => {
 const storedLanguage = localStorage.getItem('selectedLanguage');
 if (storedLanguage) {
 setLanguage(storedLanguage);
 }
 }, []);

 const updateLanguage = (lang) => {
 setLanguage(lang);
 localStorage.setItem('selectedLanguage', lang);
 };

 return (
 <LanguageContext.Provider value={{ language, setLanguage: updateLanguage }}>
 {children}
 </LanguageContext.Provider>
 );
};

export { LanguageContext, LanguageProvider };