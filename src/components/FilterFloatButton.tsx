import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  ButtonGroup,
} from "@heroui/react";
import FilterChips from "@/components/FilterChips.tsx";
import SearchFilter from "@/components/SearchFilter.tsx";
import { FilterFilledIcon } from "tdesign-icons-react";
import { useClearRefinements } from "react-instantsearch";

export default function FilterFloatButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { refine, canRefine } = useClearRefinements();

  return (
    <>
      {!isOpen && (
        <Button
          size={"sm"}
          onPress={onOpen}
          color="primary"
          variant="shadow"
          startContent={<FilterFilledIcon />}
          style={{
            // float button, bottom center
            zIndex: 100,
            position: "fixed",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          筛选器
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>筛选器</ModalHeader>
              <ModalBody>
                <FilterChips disableClearButton />
                <SearchFilter />
              </ModalBody>
              <ModalFooter>
                <ButtonGroup>
                  <Button
                    isDisabled={!canRefine}
                    onPress={refine}
                    color="warning"
                    variant="light"
                  >
                    清除筛选
                  </Button>
                  <Button color="primary" variant="light" onPress={onClose}>
                    应用
                  </Button>
                </ButtonGroup>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
