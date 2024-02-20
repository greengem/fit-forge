'use client';
import { useContext } from "react";
import { ExerciseDetailModalContext } from "@/contexts/ExerciseDetailModalContext";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";
import { IconChartBar, IconHistory, IconInfoCircle, IconTrophy } from "@tabler/icons-react";
import AboutTab from "./AboutTab";
import HistoryTab from "./HistoryTab";
import ChartsTab from "./ChartsTab";
import RecordsTab from "./RecordsTab";


export default function ExerciseDetailModal() {
  const { exercise, isOpen, onOpenChange } = useContext(ExerciseDetailModalContext);

  return (
    <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} isKeyboardDismissDisabled scrollBehavior="outside" >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{exercise?.name}</ModalHeader>
            <ModalBody className="pb-5">
              <Tabs aria-label="Exercise details" color="primary" fullWidth size="sm">
                <Tab 
                  key="about" 
                  title={
                    <div className="flex items-center space-x-2">
                      <IconInfoCircle size={18} />
                      <span>About</span>
                    </div>
                  }><AboutTab exercise={exercise} /></Tab>
 
                <Tab 
                  isDisabled
                  key="history" 
                  title={
                    <div className="flex items-center space-x-2">
                      <IconHistory size={18} />
                      <span>History</span>
                    </div>
                  }><HistoryTab /></Tab>
                <Tab 
                  isDisabled
                  key="charts" 
                  title={
                    <div className="flex items-center space-x-2">
                      <IconChartBar size={18} />
                      <span>Charts</span>
                    </div>
                  }><ChartsTab exerciseName={exercise?.name} /></Tab>
                <Tab 
                  isDisabled
                  key="records" 
                  title={
                    <div className="flex items-center space-x-2">
                      <IconTrophy size={18} />
                      <span>Records</span>
                    </div>
                  }><RecordsTab /></Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
