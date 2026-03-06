import Text "mo:core/Text";
import Array "mo:core/Array";

actor {
  type Country = {
    name : Text;
    capital : Text;
    currency : Text;
  };

  let countries = [
    { name = "United States"; capital = "Washington, D.C."; currency = "US Dollar" },
    { name = "Canada"; capital = "Ottawa"; currency = "Canadian Dollar" },
    { name = "United Kingdom"; capital = "London"; currency = "Pound Sterling" },
    { name = "Germany"; capital = "Berlin"; currency = "Euro" },
    { name = "France"; capital = "Paris"; currency = "Euro" },
    { name = "Australia"; capital = "Canberra"; currency = "Australian Dollar" },
    { name = "Japan"; capital = "Tokyo"; currency = "Yen" },
    { name = "China"; capital = "Beijing"; currency = "Yuan Renminbi" },
    { name = "Brazil"; capital = "Brasilia"; currency = "Real" },
    { name = "Russia"; capital = "Moscow"; currency = "Ruble" },
    { name = "India"; capital = "New Delhi"; currency = "Indian Rupee" },
    { name = "Mexico"; capital = "Mexico City"; currency = "Mexican Peso" },
    { name = "South Africa"; capital = "Pretoria"; currency = "South African Rand" },
    { name = "Italy"; capital = "Rome"; currency = "Euro" },
    { name = "Spain"; capital = "Madrid"; currency = "Euro" },
    { name = "Netherlands"; capital = "Amsterdam"; currency = "Euro" },
    { name = "Switzerland"; capital = "Bern"; currency = "Swiss Franc" },
    { name = "Turkey"; capital = "Ankara"; currency = "Turkish Lira" },
    { name = "Argentina"; capital = "Buenos Aires"; currency = "Argentine Peso" },
    { name = "South Korea"; capital = "Seoul"; currency = "Won" },
    { name = "Saudi Arabia"; capital = "Riyadh"; currency = "Saudi Riyal" },
    { name = "Indonesia"; capital = "Jakarta"; currency = "Rupiah" },
    { name = "Sweden"; capital = "Stockholm"; currency = "Swedish Krona" },
    { name = "Norway"; capital = "Oslo"; currency = "Norwegian Krone" },
    { name = "Poland"; capital = "Warsaw"; currency = "Zloty" },
    { name = "Thailand"; capital = "Bangkok"; currency = "Baht" },
    { name = "New Zealand"; capital = "Wellington"; currency = "New Zealand Dollar" },
    { name = "Belgium"; capital = "Brussels"; currency = "Euro" },
    { name = "Austria"; capital = "Vienna"; currency = "Euro" },
    { name = "Nigeria"; capital = "Abuja"; currency = "Naira" },
    { name = "UAE"; capital = "Abu Dhabi"; currency = "UAE Dirham" },
    { name = "Malaysia"; capital = "Kuala Lumpur"; currency = "Ringgit" },
    { name = "Singapore"; capital = "Singapore"; currency = "Singapore Dollar" },
    { name = "Denmark"; capital = "Copenhagen"; currency = "Danish Krone" },
    { name = "Israel"; capital = "Jerusalem"; currency = "New Shekel" },
    { name = "Czech Republic"; capital = "Prague"; currency = "Czech Koruna" },
    { name = "Greece"; capital = "Athens"; currency = "Euro" },
    { name = "Finland"; capital = "Helsinki"; currency = "Euro" },
    { name = "Portugal"; capital = "Lisbon"; currency = "Euro" },
    { name = "Romania"; capital = "Bucharest"; currency = "Leu" },
    { name = "Ukraine"; capital = "Kyiv"; currency = "Hryvnia" },
    { name = "Hungary"; capital = "Budapest"; currency = "Forint" },
    { name = "Ireland"; capital = "Dublin"; currency = "Euro" },
    { name = "Chile"; capital = "Santiago"; currency = "Chilean Peso" },
    { name = "Vietnam"; capital = "Hanoi"; currency = "Dong" },
    { name = "Pakistan"; capital = "Islamabad"; currency = "Pakistani Rupee" },
    { name = "Colombia"; capital = "Bogota"; currency = "Peso" },
    { name = "Philippines"; capital = "Manila"; currency = "Peso" },
    { name = "Egypt"; capital = "Cairo"; currency = "Egyptian Pound" }
  ];

  public query ({ caller }) func getCountries() : async [Country] {
    countries;
  };

  public query ({ caller }) func searchCountries(searchTerm : Text) : async [Country] {
    let term = searchTerm.toLower();

    countries.filter(
      func(country) {
        country.name.toLower().contains(#text term) or
        country.capital.toLower().contains(#text term) or
        country.currency.toLower().contains(#text term)
      }
    );
  };
};
