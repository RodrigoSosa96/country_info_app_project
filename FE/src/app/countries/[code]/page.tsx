import { RedirectType, redirect } from "next/navigation";
import { getCountryInfo } from "~/actions/countries";
import CountryDetail from "~/components/country-detail";

export default async function CountryDetailPage({
  params: { code },
}: {
  params: { code: string };
}) {
  const countryData = await getCountryInfo(code);
  if (!countryData.success) {
    return redirect("/", RedirectType.replace);
  }

  return <CountryDetail country={countryData.data} />;
}
