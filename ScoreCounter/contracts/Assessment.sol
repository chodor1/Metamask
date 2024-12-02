// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasketballScoreCounter {
    int256 public score; // Score value (points)

    /// Add a point to the score
    function addPoint() public {
        require(score < type(int256).max, "Score overflow");
        score++;
    }

    /// Remove a point from the score
    function removePoint() public {
        require(score > type(int256).min, "Score underflow");
        score--;
    }

    /// Get the current score
    function getScore() public view returns (int256) {
        return score;
    }
}
