import { useSelector } from 'react-redux';

export default function useSiteDataContent() {
  const currentLang = useSelector((state) => state.intl.locale);
  const content = useSelector(
    (state) => state.content.subrequests?.[`footer-${currentLang}`]?.data || {},
  );

  return content;
}
