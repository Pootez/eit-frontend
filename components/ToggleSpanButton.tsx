import { CollectionContext } from "@/contexts/CollectionContext"
import { Button } from "@heroui/react"
import { useContext } from "react"
import { FaToggleOff, FaToggleOn } from "react-icons/fa"

const ToggleSpanButton = () => {
  const { enabled, setEnabled } = useContext(CollectionContext)

  return (
    <Button
      onPress={() => setEnabled(!enabled)}
      color="primary"
      href="#"
      variant={!enabled ? "solid" : "ghost"}
      endContent={!enabled ? <FaToggleOn /> : <FaToggleOff />}
    >
      {!enabled ? "Enable Span" : "Disable Span"}
    </Button>
  )
}

export default ToggleSpanButton
