import { CustomDataContext } from "@/contexts/CustomDataContext"
import {
  Button,
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

const AddCustomDataModal = () => {
  const { customData, setCustomData } = useContext(CustomDataContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  return (
    <div className="flex flex-col align-center">
      <Button
        onPress={onOpen}
        color="primary"
        href="#"
        variant="faded"
        endContent={<GrConfigure size="15px" />}
      >
        Add Data
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
                    custom_data: string
                  }

                  setCustomData([...customData, data.custom_data])
                  onClose()
                }}
              >
                <ModalHeader className="flex flex-col gap-1">
                  Add Custom Data
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    label="Custom Data String"
                    placeholder="Enter custom data string"
                    name="custom_data"
                    variant="bordered"
                  />
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
                    Add
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

export default AddCustomDataModal
