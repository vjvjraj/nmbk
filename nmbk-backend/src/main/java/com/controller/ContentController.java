package com.nmbk.controller;

import com.nmbk.model.Enrichment;
import com.nmbk.model.Solution;
import com.nmbk.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1") // Base path for all our API routes
public class ContentController {

    private final ContentService contentService;

    // Spring Boot automatically injects the ContentService
    @Autowired
    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @GetMapping("/solutions")
    public List<Solution> getAllSolutions() {
        return contentService.getSolutions();
    }

    @GetMapping("/enrichment")
    public List<Enrichment> getAllEnrichmentActivities() {
        return contentService.getEnrichmentActivities();
    }
}
