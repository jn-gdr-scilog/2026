import { Typography } from "./base/Typography"
import { Callout, InfoBox } from "./layout/Callout"
import { ThemeCard, DateCard, Area } from "./layout/Cards"
import { ThemeGrid, ImportantDates, ResearchAreas } from "./layout/Grids"
import { CTAButton, CallToAction, ContactButton } from "./content/Buttons"
import { Session,ParallelSessions,SubSession } from "./conference/Session"
import { VenueMap } from "./venue/VenueMap"


export const MDXComponents = {
  ...Typography,
  
  // Layout
  Callout,
  InfoBox,
  ThemeCard,
  ThemeGrid,
  DateCard,
  ImportantDates,
  ResearchAreas,
  Area,
  
  // Buttons
  Button: CTAButton,
  CallToAction,
  ContactButton,
  
  // Conference
  Session,
  SubSession,
  ParallelSessions,

  VenueMap
  
}