import { icons } from "lucide-react";

export const SelectTravelesList =[
    {
        id:1,
        title:'Just Me',
        decs:'A sole travels in exploration',
        icon:'👍',
        people:'1'

    },
    {
        id:2,
        title:'A Couple',
        decs:'Two travels in tandem',
        icon:"🥂",
        people:'2 People'

    },
    {
        id:3,
        title:'Family',
        decs:"A group of fun loving adv",
        icon:"🏠",
        people:'3 to 5 people'

    },
    {
        id:4,
        title:'Friends',
        decs:'A bunch of thrill-seeks',
        icon:'🧑‍🤝‍🧑',
        people:'5 to 10 people'

    },
]

export const SelectBudgetOption = [
    {
        id:1,
        title:'Cheap',
        decs:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        decs:'Keep cost on the average side',
        icon:'💰'
    },
    {
        id:3,
        title:' Luxury',
        decs:'Keep cost on the top side',
        icon:'💸'
    },
]

export const AI_PROMPT = 'Generate travel plan for Location: {location} for {totalDays} Days for {traveler} with a {budget} budget, give me hotel option list with Hotel Name, Hotel address, Price, hotel image URL, geo coordinate rating, description and suggest itineracy with place name,Place Detail, Place image URL, Geo Coordinates, ticketPricing,Time Travel each of the location for 2 days with each day plan with best time to visit in one object "JSON" format'