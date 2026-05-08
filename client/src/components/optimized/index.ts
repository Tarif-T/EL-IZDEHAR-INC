/**
 * Optimized components barrel export
 */
export { LazyImage } from "./LazyImage";
export { VirtualizedList, useVirtualScroll } from "./VirtualizedList";
export { 
  NavigationItem, 
  ServiceCard, 
  TeamMemberCard, 
  AchievementStat, 
  ContactInfoItem,
  withMemoization,
  shallowPropsEqual 
} from "./MemorizedComponents";
export { 
  AsyncBoundary, 
  PageAsyncBoundary, 
  ComponentAsyncBoundary, 
  FormAsyncBoundary,
  useAsyncBoundary 
} from "./AsyncBoundary";