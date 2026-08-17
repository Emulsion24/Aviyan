import { PrismaClient } from "@prisma/client";
import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load districtSubDistricts.js
 */
function loadDistrictSubDistricts() {
  const filePath = path.join(
    __dirname,
    "districtSubDistricts.js"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Data file not found: ${filePath}`
    );
  }

  const source = fs.readFileSync(
    filePath,
    "utf8"
  );

  const sandbox = {};

  vm.createContext(sandbox);

  vm.runInContext(
    `
      ${source}

      globalThis.__districtSubDistricts =
        districtSubDistricts;
    `,
    sandbox
  );

  return sandbox.__districtSubDistricts;
}

async function main() {
  console.log("==========================================");
  console.log("      TEHSIL SEED STARTED");
  console.log("==========================================");

  const districtSubDistricts =
    loadDistrictSubDistricts();

  if (!Array.isArray(districtSubDistricts)) {
    throw new Error(
      "districtSubDistricts.js does not contain a valid districtSubDistricts array."
    );
  }

  console.log(
    `District groups found: ${districtSubDistricts.length}`
  );

  let totalTehsils = 0;
  let insertedTehsils = 0;
  let skippedTehsils = 0;
  let missingDistricts = 0;

  // ------------------------------------------
  // CHECK DISTRICTS
  // ------------------------------------------

  console.log("\nChecking districts...\n");

  for (const district of districtSubDistricts) {
    if (!district.districtId) {
      console.warn(
        `⚠️ Missing districtId for: ${district.districtName}`
      );

      continue;
    }

    const dbDistrict =
      await prisma.district.findUnique({
        where: {
          id: district.districtId,
        },

        select: {
          id: true,
          name: true,
        },
      });

    if (!dbDistrict) {
      console.error(
        `❌ District not found: ${district.districtName} (${district.districtId})`
      );

      missingDistricts++;
    }
  }

  if (missingDistricts > 0) {
    throw new Error(
      `${missingDistricts} district(s) from districtSubDistricts.js were not found in the database.`
    );
  }

  console.log("✅ All district IDs exist.\n");

  // ------------------------------------------
  // SEED TEHSILS
  // ------------------------------------------

  for (const district of districtSubDistricts) {
    if (
      !district.districtId ||
      !Array.isArray(district.tehsils) ||
      district.tehsils.length === 0
    ) {
      continue;
    }

    console.log(
      `Processing: ${district.districtName} (${district.tehsils.length} tehsils)`
    );

    totalTehsils += district.tehsils.length;

    // Get existing Tehsils
    const existingTehsils =
      await prisma.tehsil.findMany({
        where: {
          districtId: district.districtId,
        },

        select: {
          name: true,
        },
      });

    const existingNames = new Set(
      existingTehsils.map((tehsil) =>
        tehsil.name.trim().toLowerCase()
      )
    );

    // Remove duplicates from input
    const processedNames = new Set();

    const newTehsils = [];

    for (const tehsilName of district.tehsils) {
      if (!tehsilName) {
        continue;
      }

      const name = String(tehsilName).trim();

      if (!name) {
        continue;
      }

      const normalizedName =
        name.toLowerCase();

      // Duplicate inside source file
      if (
        processedNames.has(normalizedName)
      ) {
        continue;
      }

      processedNames.add(normalizedName);

      // Already exists
      if (
        existingNames.has(normalizedName)
      ) {
        skippedTehsils++;
        continue;
      }

      newTehsils.push({
        name,
        districtId: district.districtId,
      });
    }

    // Insert
    if (newTehsils.length > 0) {
      const result =
        await prisma.tehsil.createMany({
          data: newTehsils,
        });

      insertedTehsils += result.count;
    }
  }

  // ------------------------------------------
  // RESULT
  // ------------------------------------------

  console.log("\n==========================================");
  console.log("       TEHSIL SEED COMPLETED");
  console.log("==========================================");

  console.log(
    `District groups : ${districtSubDistricts.length}`
  );

  console.log(
    `Tehsils in file  : ${totalTehsils}`
  );

  console.log(
    `Inserted         : ${insertedTehsils}`
  );

  console.log(
    `Already existed  : ${skippedTehsils}`
  );

  console.log("==========================================");
}

main()
  .catch((error) => {
    console.error("\n❌ TEHSIL SEED FAILED\n");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });