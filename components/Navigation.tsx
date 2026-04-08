import { CollectionContext } from "@/contexts/CollectionContext"
import { Button, Chip, Navbar, NavbarContent, NavbarItem } from "@heroui/react"
import { useContext } from "react"
import EditConfigModal from "./EditConfigModal"
import { IoMdRefresh } from "react-icons/io"

const Navigation = () => {
  const { apiKey, collectionId, refresh, isLoading } =
    useContext(CollectionContext)

  return (
    <>
      <Navbar isBordered className="dark:bg-gray-900">
        <NavbarContent className="hidden flex flex-row justify-between w-full sm:flex">
          <NavbarItem>
            <Button
              onPress={refresh}
              isLoading={isLoading}
              color="primary"
              href="#"
              variant="faded"
              startContent={<IoMdRefresh size="20px" />}
            >
              Refresh
            </Button>
          </NavbarItem>
          <NavbarItem>
            <EditConfigModal />
          </NavbarItem>
          <NavbarItem>
            <div className="flex gap-1 p-2 shrink-0">
              <Chip>{apiKey}</Chip>
              <Chip>{collectionId}</Chip>
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default Navigation
