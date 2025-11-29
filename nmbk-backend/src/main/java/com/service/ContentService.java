package com.nmbk.service;

import com.nmbk.model.Enrichment;
import com.nmbk.model.Solution;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {

    public List<Solution> getSolutions() {
        // In a real app, you'd fetch this from a database
        return List.of(
            new Solution("1", "Web Development", "Creating responsive, high-performing websites tailored to your brand.",
                "<svg className=\"w-8 h-8\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4\"></path></svg>", 
                "teal"),
            new Solution("2", "Mobile Apps", "Developing intuitive, engaging mobile applications for iOS & Android.",
                "<svg className=\"w-8 h-8\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z\"></path></svg>", 
                "blue"),
            new Solution("3", "Cloud Solutions", "Leveraging cloud infrastructure for scalable, secure, and efficient operations.",
                "<svg className=\"w-8 h-8\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth=\"2\" d=\"M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z\"></path></svg>", 
                "indigo")
        );
    }

    public List<Enrichment> getEnrichmentActivities() {
        // In a real app, you'd fetch this from a database
        return List.of(
            new Enrichment("1", "Yoga Classes", "Find balance with our rejuvenating yoga sessions for all skill levels.", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto-format&fit=crop", "Yoga Class"),
            new Enrichment("2", "Bharatanatyam", "Explore the grace of this beautiful classical Indian dance form.", "https://images.unsplash.com/photo-1621335824967-24AC02190534?q=80&w=1200&auto-format&fit=crop", "Bharatanatyam Dance"),
            new Enrichment("3", "Bhajan Classes", "Join our soulful singing sessions to experience devotional music.", "https://images.unsplash.com/photo-1583573636327-1279a0525255?q=80&w=1200&auto-format&fit=crop", "People singing Bhajans")
        );
    }
}
