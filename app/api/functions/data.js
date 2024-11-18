"use client"

export var responselanguageManner = ""
export var responseWordCount = 200
export var responseKeywords = []

export const changeLanguageManner = (updatedManner) => {
    responselanguageManner = updatedManner
}

export const changeWordCount = (updatedWordCount) => {
    responseWordCount = updatedWordCount
}

export const changeKeywords = (updatedKeywords) => {
    responseKeywords = updatedKeywords
}

export let selectedPrompt = {}

export const changeSelectedPrompt = (currentPrompt) => {
    selectedPrompt = currentPrompt
}