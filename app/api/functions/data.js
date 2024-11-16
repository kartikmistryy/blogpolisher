"use client"

import { useState } from "react"

export let responselanguageManner = ""
export let responseWordCount = 200
export let responseKeywords = []

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