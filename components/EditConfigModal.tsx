import { CollectionContext } from "@/contexts/CollectionContext"
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react"
import { useContext } from "react"
import { GrConfigure } from "react-icons/gr"

const EditConfigModal = () => {
  const { enabled, setApiKey, setCollectionId } = useContext(CollectionContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        href="#"
        variant="faded"
        isDisabled={!enabled}
        endContent={<GrConfigure size="15px"/>}
      >
        Edit Config
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent className="bg-gray-800">
          {(onClose) => (
            <>
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  let data = Object.fromEntries(
                    new FormData(e.currentTarget),
                  ) as {
                    apiKey: string
                    collectionId: string
                    remember: string
                  }

                  if (data.remember) {
                    localStorage.setItem("api_key", data.apiKey)
                    localStorage.setItem("collection_id", data.collectionId)
                  }
                  setApiKey(data.apiKey)
                  setCollectionId(data.collectionId)
                  onClose()
                }}
              >
                <ModalHeader className="flex flex-col gap-1">
                  Edit Configuration
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    label="API key"
                    placeholder="Enter the API key"
                    name="apiKey"
                    type="password"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    label="Collection ID"
                    placeholder="Enter the collection ID"
                    name="collectionId"
                    variant="bordered"
                  />
                  <div className="flex py-2 px-1 justify-between">
                    <Checkbox
                      classNames={{
                        label: "text-small",
                      }}
                      name="remember"
                      value="yes"
                    >
                      Remember details
                    </Checkbox>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    type="reset"
                    color="danger"
                    variant="flat"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button type="submit" color="primary">
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditConfigModal
