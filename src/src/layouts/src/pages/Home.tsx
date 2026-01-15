import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="space-y-10">
      {/* Intro */}
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">
          Naturlig støtte for et langt og aktivt liv
        </h1>
        <p>
          VitalityBoost tilbyr kosttilskudd utviklet for deg som ønsker å ta vare
          på helsen – i dag og i årene som kommer. Våre produkter er basert på
          dokumenterte ingredienser og tydelig informasjon.
        </p>
      </div>

      {/* Verdier */}
      <div className="grid gap-6 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-semibold mb-2">Trygghet</h2>
          <p>
            Klare beskrivelser, ærlige ingredienslister og produkter du kan stole
            på.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Kvalitet</h2>
          <p>
            Utviklet med fokus på kvalitet, renhet og gode produksjonsrutiner.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Enkelhet</h2>
          <p>
            Få produkter, tydelig bruk og enkel bestilling – uten unødvendig
            kompleksitet.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="pt-6">
        <Link
          to="/shop"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-md text-lg hover:bg-green-800"
        >
          Gå til nettbutikken
        </Link>
      </div>
    </section>
  );
}
