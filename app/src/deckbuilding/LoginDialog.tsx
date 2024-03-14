/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PLATFORM_URI, useMe } from '@gamepark/react-client'
import { Dialog } from '@gamepark/react-game'
import { NavButton } from '@gamepark/react-game/dist/components/menus/Menu/NavButton'
import { useTranslation } from 'react-i18next'

const query = new URLSearchParams(window.location.search)
const locale = query.get('locale') || 'en'

export const LoginDialog = () => {
  const { t } = useTranslation()
  const me = useMe()

  return <Dialog css={style} open={me !== undefined && !me.user}>
    <h2>{t('login.title')}</h2>
    <p>{t('login.detail')}</p>
    <NavButton url={`${PLATFORM_URI}/${locale}/auth/sign-in?callbackUrl=${encodeURIComponent(window.location.href)}`}>
      {t('login.button')}
    </NavButton>
  </Dialog>
}

const style = css`
  font-size: 3.2em;

  > h2 {
    margin: 0.5em 0;
  }
`