import { useTranslation } from 'react-i18next'

export const DrawHeader = () => {
  const { t } = useTranslation()
    return <>{t('header.draw')}</>
}
