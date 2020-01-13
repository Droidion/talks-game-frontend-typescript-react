import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./change-language.module.scss";

/**
 * Switcher between languages
 *
 * @visibleName ChangeLanguage
 */
const ChangeLanguage: React.FC = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <ul className={styles.wrapper}>
      <li onClick={() => changeLanguage("ru")}>RU</li>
      <li onClick={() => changeLanguage("en")}>EN</li>
    </ul>
  );
};

export default ChangeLanguage;
