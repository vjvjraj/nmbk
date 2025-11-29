package com.nmbk.model;

// Using a Java Record for a simple, immutable data object
public record Solution(
    String id,
    String title,
    String description,
    String icon, // We'll pass the SVG string directly
    String color
) {}
