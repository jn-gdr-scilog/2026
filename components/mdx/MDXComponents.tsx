import { Typography } from "./base/Typography"
import { Callout, InfoBox } from "./layout/Callout"
import { ThemeCard, DateCard, Area } from "./layout/Cards"
import { ThemeGrid, ImportantDates, ResearchAreas } from "./layout/Grids"
import { CTAButton, CallToAction, ContactButton } from "./content/Buttons"
import { Session,ParallelSessions,SubSession } from "./conference/Session"
import { VenueMap } from "./venue/VenueMap"
import { ClassAttributes, TableHTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime"
import { ClassAttributes, ThHTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime"
import { ClassAttributes, TdHTMLAttributes } from "react"
import { JSX } from "react/jsx-runtime"


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

  VenueMap,

   table: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableElement> & TableHTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-200" {...props} />
    </div>
  ),
  th: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableHeaderCellElement> & ThHTMLAttributes<HTMLTableHeaderCellElement>) => (
    <th className="border border-gray-200 px-4 py-2 text-left font-semibold bg-gray-50" {...props} />
  ),
  td: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLTableDataCellElement> & TdHTMLAttributes<HTMLTableDataCellElement>) => (
    <td className="border border-gray-200 px-4 py-2" {...props} />
  ),
  
}