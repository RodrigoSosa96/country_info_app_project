import Link from "next/link";
import { getAllCountries, getCountryInfo } from "~/actions/countries";
import { DataTable } from "~/components/data-table/data-table";
import { columns } from "./_data/columns";
import { actions } from "./_data/tableAction";

export default async function HomePage() {
  const countries = await getAllCountries();
  // const countries = await getCountryInfo("AR");
  if (!countries.success) {
    return <div className="flex min-h-screen items-center justify-center text-lg font-semibold text-red-500">Failed to load data</div>
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Countries of the World</h1>
      <DataTable data={countries.data} columns={columns} searchFilter="name" />
    </main>
  )
}
