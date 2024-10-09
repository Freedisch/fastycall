export const mockCalls = [
    {
      id: 1,
      shortSummary: "Car accident on KN 5 Rd",
      detailedSummary: "Multi-vehicle collision on KN 5 Rd near the city center. Three cars involved, potential injuries reported. Traffic is heavily impacted.",
      icon: "Car",
      callStatus: "active",
      createdDate: new Date(),
      fearLevel: 65,
      stressLevel: 80,
      location: { lat: -1.9441, lng: 30.0619 }, // Kigali city center
      transcript: [
        { role: 'caller' as const, message: "There's been a car accident on KN 5 Rd!" },
        { role: 'responder' as const, message: "I understand. Are there any injuries?" },
        { role: 'caller' as const, message: "Yes, I think someone is hurt. Please hurry!" },
      ]
    },
    {
      id: 2,
      shortSummary: "Fire reported in Nyabugogo",
      detailedSummary: "Large fire reported at the Nyabugogo bus park. Multiple vehicles involved. Immediate evacuation needed.",
      icon: "Flame",
      callStatus: "active",
      createdDate: new Date(Date.now() - 3600000),
      fearLevel: 85,
      stressLevel: 90,
      location: { lat: -1.9394, lng: 30.0559 }, // Nyabugogo area
      transcript: [
        { role: 'caller' as const, message: "There's a fire in the Nyabugogo bus park!" },
        { role: 'responder' as const, message: "Can you give me more details about the fire's size?" },
        { role: 'caller' as const, message: "It's spreading fast, several buses are on fire!" },
      ]
    },
    {
      id: 3,
      shortSummary: "Medical emergency in Kacyiru",
      detailedSummary: "Elderly person collapsed at home in Kacyiru. Possible heart attack. Immediate medical attention required.",
      icon: "Ambulance",
      callStatus: "active",
      createdDate: new Date(Date.now() - 7200000),
      fearLevel: 70,
      stressLevel: 75,
      location: { lat: -1.9468, lng: 30.0917 }, // Kacyiru area
      transcript: [
        { role: 'caller' as const, message: "My grandfather has collapsed! We need an ambulance in Kacyiru!" },
        { role: 'responder' as const, message: "I'm dispatching an ambulance. Is he breathing?" },
        { role: 'caller' as const, message: "Yes, but his breathing is very shallow." },
      ]
    },
    {
      id: 4,
      shortSummary: "Robbery in Kimihurura",
      detailedSummary: "Armed robbery reported at a convenience store in Kimihurura. Suspect fled on foot. No injuries reported.",
      icon: "AlertTriangle",
      callStatus: "active",
      createdDate: new Date(Date.now() - 1800000),
      fearLevel: 75,
      stressLevel: 80,
      location: { lat: -1.9563, lng: 30.0872 }, // Kimihurura
      transcript: [
        { role: 'caller' as const, message: "We've just been robbed! The thief had a gun!" },
        { role: 'responder' as const, message: "Stay calm. Are you safe now? Can you describe the suspect?" },
        { role: 'caller' as const, message: "Yes, we're safe. He was wearing a red hoodie and jeans." },
      ]
    },
    {
      id: 5,
      shortSummary: "Gas leak in Gisozi",
      detailedSummary: "Suspected gas leak reported in a residential area in Gisozi. Strong smell of gas in the air. Evacuation may be necessary.",
      icon: "AlertOctagon",
      callStatus: "active",
      createdDate: new Date(Date.now() - 5400000),
      fearLevel: 60,
      stressLevel: 70,
      location: { lat: -1.9322, lng: 30.0657 }, // Gisozi
      transcript: [
        { role: 'caller' as const, message: "There's a strong smell of gas in our neighborhood!" },
        { role: 'responder' as const, message: "Do not turn on any electrical appliances. Are your windows open?" },
        { role: 'caller' as const, message: "Yes, we've opened all windows. What should we do next?" },
      ]
    },
    {
      id: 6,
      shortSummary: "Traffic light malfunction in Remera",
      detailedSummary: "Traffic lights at major intersection in Remera not functioning. Causing traffic congestion and risk of accidents.",
      icon: "TrafficCone",
      callStatus: "active",
      createdDate: new Date(Date.now() - 10800000),
      fearLevel: 40,
      stressLevel: 60,
      location: { lat: -1.9573, lng: 30.1126 }, // Remera
      transcript: [
        { role: 'caller' as const, message: "The traffic lights at KG 11 Ave and KG 567 St are not working!" },
        { role: 'responder' as const, message: "Thank you for reporting. Are there any police officers directing traffic?" },
        { role: 'caller' as const, message: "No, there's no one here yet. It's getting chaotic." },
      ]
    },
    {
      id: 7,
      shortSummary: "Flooding in Nyamirambo",
      detailedSummary: "Heavy rain causing flooding in low-lying areas of Nyamirambo. Several homes at risk. Immediate assistance needed.",
      icon: "Droplet",
      callStatus: "active",
      createdDate: new Date(Date.now() - 14400000),
      fearLevel: 70,
      stressLevel: 85,
      location: { lat: -1.9805, lng: 30.0464 }, // Nyamirambo
      transcript: [
        { role: 'caller' as const, message: "The water is rising fast in our area! We need help!" },
        { role: 'responder' as const, message: "We're sending emergency services. How high is the water?" },
        { role: 'caller' as const, message: "It's almost knee-deep in the street and getting higher." },
      ]
    },
    {
      id: 8,
      shortSummary: "Building collapse in Gitega",
      detailedSummary: "Partial collapse of an old building in Gitega sector. Unknown if people are trapped inside. Urgent rescue operation required.",
      icon: "Building",
      callStatus: "active",
      createdDate: new Date(Date.now() - 1800000),
      fearLevel: 90,
      stressLevel: 95,
      location: { lat: -1.9610, lng: 30.0478 }, // Gitega
      transcript: [
        { role: 'caller' as const, message: "A building just collapsed on KN 124 St! People might be inside!" },
        { role: 'responder' as const, message: "Emergency services are on their way. Is it safe for you to check if you hear any voices?" },
        { role: 'caller' as const, message: "I can hear some faint cries for help from the rubble." },
      ]
    },
    {
      id: 9,
      shortSummary: "Chemical spill in industrial area",
      detailedSummary: "Chemical spill reported at a factory in the Gikondo industrial area. Unknown substance. Environmental hazard possible.",
      icon: "Flask",
      callStatus: "active",
      createdDate: new Date(Date.now() - 3600000),
      fearLevel: 75,
      stressLevel: 80,
      location: { lat: -1.9693, lng: 30.0786 }, // Gikondo
      transcript: [
        { role: 'caller' as const, message: "There's been a chemical spill at the factory! It smells terrible!" },
        { role: 'responder' as const, message: "Do not approach the spill. Are there any visible fumes?" },
        { role: 'caller' as const, message: "Yes, I can see a yellowish vapor rising from it." },
      ]
    },
    {
      id: 10,
      shortSummary: "Lost child in Nyarutarama",
      detailedSummary: "6-year-old child reported missing in Nyarutarama area. Last seen near the golf course. Search party needed.",
      icon: "Search",
      callStatus: "active",
      createdDate: new Date(Date.now() - 7200000),
      fearLevel: 80,
      stressLevel: 90,
      location: { lat: -1.9373, lng: 30.0967 }, // Nyarutarama
      transcript: [
        { role: 'caller' as const, message: "My son is missing! We can't find him anywhere!" },
        { role: 'responder' as const, message: "When and where did you last see him? What was he wearing?" },
        { role: 'caller' as const, message: "He was playing near the golf course. He's wearing a blue t-shirt and jeans." },
      ]
    },
    {
      id: 11,
      shortSummary: "Power outage in Kiyovu",
      detailedSummary: "Widespread power outage reported in Kiyovu neighborhood. Affecting residential and commercial areas. Cause unknown.",
      icon: "Zap",
      callStatus: "active",
      createdDate: new Date(Date.now() - 5400000),
      fearLevel: 30,
      stressLevel: 50,
      location: { lat: -1.9520, lng: 30.0579 }, // Kiyovu
      transcript: [
        { role: 'caller' as const, message: "The entire neighborhood has lost power!" },
        { role: 'responder' as const, message: "Thank you for reporting. Do you see any downed power lines?" },
        { role: 'caller' as const, message: "No, I don't see anything unusual outside." },
      ]
    },
    {
      id: 12,
      shortSummary: "Landslide risk in Jali",
      detailedSummary: "Heavy rains have increased landslide risk in Jali sector. Several homes in danger. Evacuation may be necessary.",
      icon: "Mountain",
      callStatus: "active",
      createdDate: new Date(Date.now() - 10800000),
      fearLevel: 75,
      stressLevel: 85,
      location: { lat: -1.9181, lng: 30.1131 }, // Jali
      transcript: [
        { role: 'caller' as const, message: "The hill behind our houses is starting to slide!" },
        { role: 'responder' as const, message: "We're sending emergency services. Are there safe areas nearby you can go to?" },
        { role: 'caller' as const, message: "Yes, there's a school on higher ground about 500 meters away." },
      ]
    },
    {
      id: 13,
      shortSummary: "Street fight in Nyamirambo",
      detailedSummary: "Large street fight reported in Nyamirambo, near the stadium. Multiple participants involved. Police intervention required.",
      icon: "Swords",
      callStatus: "active",
      createdDate: new Date(Date.now() - 1800000),
      fearLevel: 70,
      stressLevel: 80,
      location: { lat: -1.9816, lng: 30.0550 }, // Nyamirambo stadium area
      transcript: [
        { role: 'caller' as const, message: "There's a big fight breaking out near the stadium!" },
        { role: 'responder' as const, message: "Stay in a safe place. Can you estimate how many people are involved?" },
        { role: 'caller' as const, message: "I'd say at least 20 people. It's getting really violent!" },
      ]
    },
    {
      id: 14,
      shortSummary: "Water main break in Kibagabaga",
      detailedSummary: "Major water main break reported in Kibagabaga. Streets flooded, water supply interrupted. Immediate repair needed.",
      icon: "Droplet",
      callStatus: "active",
      createdDate: new Date(Date.now() - 3600000),
      fearLevel: 40,
      stressLevel: 60,
      location: { lat: -1.9425, lng: 30.1139 }, // Kibagabaga
      transcript: [
        { role: 'caller' as const, message: "There's water gushing out of the street!" },
        { role: 'responder' as const, message: "We're alerting the water company. Is the water entering any buildings?" },
        { role: 'caller' as const, message: "Not yet, but it's getting close to some shops." },
      ]
    },
    {
      id: 15,
      shortSummary: "Trapped hikers on Mount Kigali",
      detailedSummary: "Group of hikers reported lost and possibly injured on Mount Kigali. Darkness falling. Search and rescue operation needed.",
      icon: "Mountain",
      callStatus: "active",
      createdDate: new Date(Date.now() - 7200000),
      fearLevel: 70,
      stressLevel: 85,
      location: { lat: -1.9322, lng: 30.0283 }, // Mount Kigali
      transcript: [
        { role: 'caller' as const, message: "We're lost on Mount Kigali and one of us is injured!" },
        { role: 'responder' as const, message: "Stay where you are. Do you have any idea of your location on the mountain?" },
        { role: 'caller' as const, message: "We can see the city lights, but we're in a forested area." },
      ]
    },
    {
      id: 16,
      shortSummary: "Stampede at Amahoro Stadium",
      detailedSummary: "Stampede reported at Amahoro Stadium during a major event. Multiple injuries reported. Urgent medical assistance required.",
      icon: "Users",
      callStatus: "active",
      createdDate: new Date(Date.now() - 900000),
      fearLevel: 90,
      stressLevel: 95,
      location: { lat: -1.9508, lng: 30.1175 }, // Amahoro Stadium
      transcript: [
        { role: 'caller' as const, message: "There's a stampede at the stadium! People are getting crushed!" },
        { role: 'responder' as const, message: "Emergency services are on their way. Can you see any exit points that are clear?" },
        { role: 'caller' as const, message: "The north exit seems less crowded, but it's chaos everywhere!" },
      ]
    },
]