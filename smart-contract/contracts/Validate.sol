// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.1;

contract Validate {
    event CheckValidity(bool isValidated, bool isExpired, bytes32 ticketId);

    struct TicketStruct {
        bool isValidated;
        bool isExpired;
        bytes32 ticketId;
    }
    TicketStruct[] public tickets;

    function setValidity( bool isValidated, bool isExpired, bytes32 ticketId ) public {
        tickets.push(TicketStruct(isValidated, isExpired, ticketId));
        emit CheckValidity(isValidated, isExpired, ticketId);
    }

    function getValidity(bytes32 ticketId) public view returns (bool, bool) {
        for (uint256 i = 0; i < tickets.length; i++) {
            if (tickets[i].ticketId == ticketId) {
                return (tickets[i].isValidated, tickets[i].isExpired);
            }
        }

        return (false, false);
    }
}
