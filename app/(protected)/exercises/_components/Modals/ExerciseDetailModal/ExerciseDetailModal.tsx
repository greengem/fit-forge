"use client";
import { useContext } from "react";
import { ExerciseDetailModalContext } from "@/contexts/ExerciseDetailModalContext";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { Tabs, Tab } from "@nextui-org/tabs";
import {
  IconChartBar,
  IconHistory,
  IconInfoCircle,
  IconTrophy,
} from "@tabler/icons-react";
import AboutTab from "./AboutTab";
import HistoryTab from "./HistoryTab";
import ChartsTab from "./ChartsTab";
import RecordsTab from "./RecordsTab";

export default function ExerciseDetailModal() {
  const { exercise, isOpen, onOpenChange } = useContext(
    ExerciseDetailModalContext,
  );

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      isKeyboardDismissDisabled
      scrollBehavior="outside"
      size="lg"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {exercise?.name}
            </ModalHeader>
            <ModalBody className="pb-5">
              <Tabs
                aria-label="Exercise details"
                color="primary"
                fullWidth
                size="sm"
              >
                <Tab
                  key="about"
                  title={
                    <div className="flex items-center space-x-2">
                      <IconInfoCircle size={17} />
                      <span>About</span>
                    </div>
                  }
                >
                  <AboutTab exercise={exercise} />
                </Tab>

                <Tab
                  key="history"
                  title={
                    <div className="flex items-center space-x-2">
                      <IconHistory size={17} />
                      <span>History</span>
                    </div>
                  }
                >
                  <HistoryTab exerciseId={exercise?.id} />
                </Tab>
                <Tab
                  key="charts"
                  title={
                    <div className="flex items-center space-x-2">
                      <IconChartBar size={17} />
                      <span>Charts</span>
                    </div>
                  }
                >
                  <ChartsTab
                    exerciseId={exercise?.id}
                    exerciseName={exercise?.name}
                  />
                </Tab>
                <Tab
                  key="records"
                  title={
                    <div className="flex items-center space-x-2">
                      <IconTrophy size={17} />
                      <span>Records</span>
                    </div>
                  }
                >
                  <RecordsTab exerciseId={exercise?.id} />
                </Tab>
              </Tabs>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
