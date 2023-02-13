import { useSelector } from 'react-redux';

export default function useSiteDataContent() {
  const currentLang = useSelector((state) => state.intl.locale);
  const content = useSelector(
    (state) =>
      state.content.subrequests?.[`site-data-${currentLang}`]?.data || {},
  );

  return content;
}
