import React from 'react';
import Navbar from '../Components/Navbar';
// Navbar
const companies = {
  "A": ["Akash Byjus", "Aarvee Assocites", "Accelarise", "Accenture", "Accolite", "Addverb", "Adobe", "Afcons", "Amadeus", "Amazon", "AWS", "AMD", "AMD Hyderabad", "Amadocs", "Amerian Express", "Analaog Devices", "Analaog Devices Inc.", "Apollo 24/7", "Appleid Materials", "Aquasecurity", "ArcadisArcesium", "Arista Network", "Ather Energy", "Avanti", "Axis Bank", "Axis My India", "Axtria"],
  "B": ["Bajaj Auto", "Bajaj Auto Limited", "Barclays", "Base Education", "Baxter", "Becton Dickinson", "Belzabir", "BEL", "Biocon", "BizAcuity"],
  "C": ["C Dot(PSU)", "C_Dot", "Cadence", "Carin(Vedanta)", "Cashfree", "Caterpillar", "Ceremorphic", "Chetak technologgy Limited", "Chronus", "Citi Bank", "Citrix", "CloudAngles", "Cogoport", "Collin Aerospace", "Controlytics", "Cummins", "Cyient"],
  "D": ["D E Shaw", "Daimler Rucks", "Danieli", "Datawrkz", "DeliverooDELL", "Deloitte", "Deutsche Bank", "DP World", "Dr.Reddy's Labs", "Druva"],
  "E": ["Edgistfy", "Elucidata", "Emergy", "Emphase Energy", "Everest", "Excellencia", "EXL", "ExxonMobil", "EY GDS", "EY INDIA"],
  "F": ["Factspan Analytics", "Fedaral Bank", "FIITJEE", "Fischer Jordan", "Fluence Energy", "Fractal"],
  "G": ["GAIL", "Ganit Business Sol", "GE Digital", "GE HealthCare", "Genpact", "GEPGKN", "Global Logic Hitachi", "Godrej Properties", "Goldman Sachs", "GREENKO"],
  "H": ["Havells", "HCL", "HCL Tech", "HDFC", "HERE", "Hero Fincorp", "Hexagon Capability Centre", "Hindustan Unilever", "Hitachi", "Hitachi Energy", "Honeywell", "HPCL", "HSBC"],
  "I": ["IBM", "ICICI", "ICICI Prudential Life Insurance", "IDBI", "Idea Forge", "Ikarus 3D", "Impact Analytics", "Incture", "Infineon", "Infinity Learn", "Infor", "Intuit", "Iqvia", "ITC"],
  "J": ["Jacobs", "JIO", "John Deere", "Johnson Matthey", ".JPMC", "Justdial"],
  "K": ["Kagool", "Khumbu Systems", "Kolamandalam MSR Service Ltd.", "Kotak Mahindra Bank", "Kubeangles"],
  "L": ["L&T", "L&T Infrastructure", "Legato", "Leoforce", "Lookout", "Loyalty Juggernaut"],
  "M": ["Magicbricks", "Mahindra and Mahindra", "MAQ Software", "Maruti Suzuki", "Marvell", "MasterCard", "Mathworks", "MBRDI", "Mechanical", "MediaTek", "MediaTek Technology", "MediBuddy", "Merilytics", "Micron", "Microchip", "Microsoft", "Morgan Stanley"],
  "N": ["Narayana", "Natwest", "Netcracker", "Netradyne", "Novartis", "Numeros Motors", "NUTANIX", "NXP"],
  "O": ["09 SOLUTIONS", "OFSS (Oracle Financial Services Software)", "Oliver Wyman", "Oracle", "Orient Electric"],
  "P": ["Paytm", "PayU", "Pepperfry", "PharmaACE", "Physics Wallah", "PineLabs", "Piramal Group", "Providence", "Publicis Sapient", "PV Insights", "PWC India"],
  "Q": ["Qualcomm", "Quantiphi Analytics", "QuickSell"],
  "R": ["Radisys", "Ramboll", "RAPIDO", "Regal Rexnord", "Reliance", "Reliance Industries", "Reliance Retail"],
  "S": ["Saarthi", "SaaS Labs", "Salesforce", "Samagra Governance", "Samsung", "Samsung Electronics", "SAP Labs"],
  "T": ["TCS", "Tata IQ", "Tata Motors", "Tata Projects Limited", "Texas Instruments", "Thoughtspot", "Trane", "TVS"],
  "U": ["UBER", "United Breweries", "Upgrad Insofe"],
  "V": ["Valeo", "VCONSTRUCT", "VECV", "Vedanta", "Vesuvius", "VISA", "Vistex", "Vodafone"],
  "W": ["WabTec", "WCB Robotics", "Wells Fargo", "Western Digital", "WIPRO", "WSP"],
  "Z": ["Zee", "Zentree Labs", "ZF", "Zifo R&D", "ZL Technologies", "Zscaler"]
};
const CompanyList = ({ companies }) => (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mt-4 mb-8 text-blue-800">Past Recruiters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.keys(companies).map((key) => (
          <div key={key} className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-4 text-green-900">{key}</h2>
            <ul className="list-disc pl-5">
              {companies[key].map((company, index) => (
                <li key={index} className="mb-1 text-yellow-900">{company}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
  
  const Oncampus = () => (
    <>
    <Navbar/>
    <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 min-h-screen py-10">
    <CompanyList companies={companies} />
    </div>
    </>
  );
  
  export default Oncampus;