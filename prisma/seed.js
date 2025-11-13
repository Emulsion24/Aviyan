import { PrismaClient } from '@prisma/client';
// --- (END MODIFICATION) ---

const prisma = new PrismaClient();


// This is where you define all your administrative data.
// We only define States and their Districts.
const STATE_DISTRICTS = {
 "Andhra Pradesh": [
    "Anantapuramu", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore (SPSR Nellore)",
    "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "Alluri Sitharama Raju",
    "Anakapalli", "Annamayya", "Bapatla", "Eluru", "Kakinada", "Konaseema", "Nandyal", "NTR", "Palnadu",
    "Parvathipuram Manyam", "Sri Sathya Sai", "Tirupati"
  ],
  "Arunachal Pradesh": [
    "Anjaw", "Capital Complex ( Itanagar )", "Changlang", "Dibang Valley", "East Kameng", "East Siang",
    "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley",
    "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang",
    "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
  ],
  "Assam": [
    "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang",
    "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi",
    "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar",
    "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar",
    "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar",
    "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar",
    "Khagaria", "Kishanganj", "Lakhisarai", "Madhubani", "Munger", "Muzaffarpur", "Nawada", "Nalanda",
    "Narcanda", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Sheikhpura", "Sheohar",
    "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari",
    "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kanker", "Kawardha", "Korba", "Korea",
    "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Rajnandgaon", "Rajnandgaon (rural)", "Raipur",
    "Surajpur", "Sukma", "Surguja"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad",
    "Chhota Udepur", "Dahod", "Dang", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda",
    "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar",
    "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
  ],
  "Haryana": [
    "Ambala", "Charkhi Dadri", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal",
    "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari",
    "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahul & Spiti", "Mandi",
    "Shimla", "Sirmaur", "Solan", "Una"
  ],
  "Jharkhand": [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih",
    "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga",
    "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
  ],
  "Karnataka": [
    "Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Hubli-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi",
    "Davanagere", "Ballari", "Vijayapura", "Raichur", "Shivamogga", "Tumakuru", "Bidar", "Hospet",
    "Gadag-Betageri", "Robertsonpet", "Hassan", "Bhadravati", "Chitradurga", "Udupi", "Kolar", "Mandya",
    "Chikkamagaluru", "Gangavati", "Bagalkot", "Ranebennuru", "Yadgir", "Haveri", "Bellary", "Koppal",
    "Chamarajanagar", "Chickballapur", "Kodagu", "Ramanagara", "Uttara Kannada", "Dakshina Kannada"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam",
    "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta",
    "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],
  "Madhya Pradesh": [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani",
    "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara",
    "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior",
    "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni",
    "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur",
    "Neemuch", "Niwari", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa",
    "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur",
    "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria",
    "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara",
    "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli",
    "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban",
    "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar",
    "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg",
    "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West",
    "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl",
    "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills",
    "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills",
    "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai",
    "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"
  ],
  "Nagaland": [
    "Chümoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung",
    "Mon", "Niuland", "Noklak", "Peren", "Phek", "Tseminyu", "Tuensang", "Wokha", "Zünheboto"
  ],
  "Odisha": [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack",
    "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur",
    "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha",
    "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada",
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
  ],
  "Punjab": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka",
    "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana",
    "Malerkotla", "Mansa", "Moga", "Mohali (SAS Nagar)", "Muktsar", "Pathankot",
    "Patiala", "Rupnagar", "Sangrur", "Shaheed Bhagat Singh Nagar (Nawanshahr)",
    "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara",
    "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur",
    "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu",
    "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand",
    "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
  ],
  "Sikkim": [
    "Gangtok", "Mangan (North Sikkim)", "Namchi (South Sikkim)", "Gyalshing (West Sikkim)", "Pakyong", "Soreng"
  ],
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri",
    "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur",
    "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal",
    "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem",
    "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli",
    "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai",
    "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial",
    "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy",
    "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad",
    "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu",
    "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad",
    "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet",
    "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura",
    "Unakoti", "West Tripura"
  ],
  "Uttarakhand": [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar",
    "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal",
    "Udham Singh Nagar", "Uttarkashi"
  ],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha (J.P. Nagar)",
    "Auraiya", "Ayodhya (Faizabad)", "Azamgarh", "Baghpat", "Bahraich", "Ballia",
    "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor",
    "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah",
    "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad",
    "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur (Panchsheel Nagar)",
    "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat",
    "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri (Lakhimpur Kheri)", "Kushinagar",
    "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura",
    "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit",
    "Pratapgarh", "Prayagraj (Allahabad)", "Rae Bareli", "Rampur", "Saharanpur",
    "Sambhal (Bhim Nagar)", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti",
    "Siddharthnagar", "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur",
    "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong",
    "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas",
    "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur",
    "Purulia", "South 24 Parganas", "Uttar Dinajpur"
  ],
  "Andaman and Nicobar Islands": [
    "Nicobar", "North and Middle Andaman", "South Andaman"
  ],
  "Chandigarh": [
    "Chandigarh"
  ],
  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli", "Daman", "Diu"
  ],
  "Delhi (National Capital Territory)": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
    "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
  ],
  "Jammu and Kashmir": [
    "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu",
    "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri",
    "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"
  ],
  "Ladakh": [
    "Kargil", "Leh"
  ],
  "Lakshadweep": [
    "Agatti", "Amini", "Andrott", "Bitra", "Chetlat", "Kadmat", "Kalpeni",
    "Kavaratti", "Kilthan", "Minicoy"
  ],
  "Puducherry": [
    "Karaikal", "Mahe", "Puducherry", "Yanam"
  ]
};


async function main() {
  console.log('Start seeding...');

  // 1. Clear all data in the correct order
  // This ensures we don't have conflicts when re-running the seed.
  await prisma.prabhari.deleteMany();
  await prisma.tehsil.deleteMany();
  await prisma.district.deleteMany();
  await prisma.sambhag.deleteMany();
  await prisma.state.deleteMany();
  await prisma.zone.deleteMany();
  console.log('Cleared existing data.');

  // 2. Seed States and Districts
  let stateCount = 0;
  let districtCount = 0;

  // Use a 'for...of' loop to handle async/await correctly
  for (const stateName of Object.keys(STATE_DISTRICTS)) {
    // Create the State
    const createdState = await prisma.state.create({
      data: {
        name: stateName,
      },
    });
    console.log(`Created state: ${createdState.name}`);
    stateCount++;

    const districts = STATE_DISTRICTS[stateName];
    
    // Create all Districts for this State
    for (const districtName of districts) {
      await prisma.district.create({
        data: {
          name: districtName,
          stateId: createdState.id, // Link to the state
        },
      });
      districtCount++;
    }
    console.log(`  Created ${districts.length} districts for ${stateName}`);
  }

  console.log('Seeding finished.');
  console.log(`Total States Created: ${stateCount}`);
  console.log(`Total Districts Created: ${districtCount}`);
  console.log('Zones, Sambhags, and Tehsils are empty as requested.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  });