import { usePathname, useRouter as useNextRouter } from "next/navigation"
import { useEffect } from "react"
import { create } from "zustand"

interface IStore {
  current: string
  isChange: boolean
  start: (pathname: string) => void
  end: () => void
}

/**
 *
 * Summary:
 *      Store router redirect
 *
 * Returns:
 *
 */
export const refRouter = create<IStore>((set) => ({
  current: String(),
  isChange: false,

  /**
   *
   * Summary:
   *      Set status change router
   *
   * Returns:
   *
   */
  start: (pathname) => set({ current: pathname, isChange: true }),

  /**
   *
   * Summary:
   *      End status change router
   *
   * Returns:
   *
   */
  end: () => set({ isChange: false }),
}))

class Router {
  constructor(push: (pathname: string) => void, isChange: boolean) {
    this.isChange = isChange
    this.push = push
  }

  isChange: boolean
  push: (pathname: string) => void
}

/**
 *
 * Summary:
 *      Custom router with state
 *
 * Returns:
 *
 */
export const useRouter = () => {
  const pathname = usePathname()
  const nextRouter = useNextRouter()
  const router = refRouter()

  const push = (href: string) => {
    /**
     * Summary:
     *      Not redirect if same pathname
     *
     * Returns:
     *
     */
    if (pathname === href) return

    /**
     * Summary:
     *      Start animation loading & redirect to destination
     *
     * Returns:
     *
     */
    router.start(pathname)
    nextRouter.push(href)
  }

  useEffect(router.end, [pathname])
  return new Router(push, router.isChange)
}
