import { useTranslation } from 'react-i18next'

export const EndPhaseHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.end-phase')}</>
}
