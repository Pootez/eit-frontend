import { CollectionContext } from "@/contexts/CollectionContext"
import { Button, Chip, Navbar, NavbarContent, NavbarItem } from "@heroui/react"
import { useContext } from "react"
import EditConfigModal from "./EditConfigModal"
import { IoMdRefresh } from "react-icons/io"
import ToggleSpanButton from "./ToggleSpanButton"

const Navigation = () => {
  const {
    enabled,
    apiKey,
    collectionId,
    refresh,
    isLoading,
    collectionData,
    error,
  } = useContext(CollectionContext)

  return (
    <>
      <Navbar isBordered className="dark:bg-gray-900">
        <NavbarContent className="hidden flex flex-row justify-between w-full sm:flex">
          <NavbarItem>
            <ToggleSpanButton />
          </NavbarItem>
          <NavbarItem>
            <Button
              onPress={refresh}
              isLoading={isLoading}
              color="primary"
              href="#"
              variant="faded"
              isDisabled={!enabled}
              startContent={<IoMdRefresh size="20px" />}
            >
              Refresh
            </Button>
          </NavbarItem>
          <NavbarItem>
            <EditConfigModal />
          </NavbarItem>
          {enabled && (
            <NavbarItem>
              <div className="flex gap-1 p-2 shrink-0">
                {!apiKey && <Chip>Missing API key</Chip>}
                {!collectionId && <Chip>Missing collection ID</Chip>}
                {!collectionData && <Chip>No data</Chip>}
                {error && <Chip>{error}</Chip>}
              </div>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </>
  )
}

export default Navigation
