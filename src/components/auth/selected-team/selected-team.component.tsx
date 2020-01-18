import React from 'react';
import { useTranslation } from 'react-i18next';

import getRoleNameByCode from '../../../lib/getRoleNameByCode';
import styles from './selected-team.module.scss';

type Props = {
  /** Name of the team role */
  number: number;
  /** Selected team number */
  role: string;
};

const SelectedTeam: React.FC<Props> = ({ role, number }) => {
  const { t } = useTranslation();
  const divNumber = <div className={styles.selectedTeamNumber}>{number}</div>
  const divRole = <div className={styles.selectedTeamRole}>{getRoleNameByCode(role, t)}</div>

  return (
    <div className={styles.selectedTeam}>
      { !!role && divRole }
      { !!number && divNumber }
    </div> 
  );
};

export default SelectedTeam;
