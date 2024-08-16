import React from 'react';
import {Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, Avatar, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

export const ProfileSettingsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="gray.900" color="white" borderRadius="md">
            <ModalHeader>
                Profile settings 
                <IconButton
                    aria-label="Close modal"
                    icon={<CloseIcon />}
                    onClick={onClose}
                    position="absolute"
                    top="10px"
                    right="10px"
                    colorScheme="whiteAlpha"
                />
            </ModalHeader>
            <ModalBody>
                <Box textAlign="center" mb={4}>
                    <Avatar size="x1" mb={4} />
                    <Button size="sm" variant="outline" colorScheme="whiteAlpha" mr={2}>
                        Upload new photo
                    </Button>
                    <Button size="sm" variant="outline" colorScheme="red">
                        Remove
                    </Button>
                </Box>
                <Select placeholder="Select currency" mb={4}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="PHP">PHP</option>
                </Select>
                <Input placeholder="Name" mb={4} defaultValue="Alex Rybachok" />
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="green" w="full" onClick={onClose}>
                    Save
                </Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
  );
};
