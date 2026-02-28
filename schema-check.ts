// Run this to check TPDB schema for available fields
const TPDB_TOKEN = "dpAEsiy8gTnDvwgbJSZnM4wczpRCU4ZbAsnM7c772905337e";
const TPDB_ENDPOINT = "https://theporndb.net/graphql";

const checkSchema = async () => {
  try {
    const response = await fetch(TPDB_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TPDB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "Scene") {
              fields {
                name
                type {
                  name
                  kind
                }
              }
            }
          }
        `,
      }),
    });

    const result = await response.json();
    console.log("Scene type fields:", JSON.stringify(result, null, 2));

    // Also check if Movie type exists
    const response2 = await fetch(TPDB_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TPDB_TOKEN}`,
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "Movie") {
              fields {
                name
                type {
                  name
                  kind
                }
              }
            }
          }
        `,
      }),
    });

    const result2 = await response2.json();
    console.log("Movie type fields:", JSON.stringify(result2, null, 2));
  } catch (error) {
    console.error("Schema check error:", error);
  }
};

// Run: npx ts-node schema-check.ts
