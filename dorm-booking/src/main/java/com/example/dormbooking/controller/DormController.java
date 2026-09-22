package com.example.dormbooking.controller;

import com.example.dormbooking.model.Dorm;
import com.example.dormbooking.service.DormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dorms")
public class DormController {

    @Autowired
    private DormService dormService;

    @GetMapping
    public ResponseEntity<List<Dorm>> getAllDorms() {
        List<Dorm> dorms = dormService.getAllDorms();
        return ResponseEntity.ok(dorms);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Dorm> getDormById(@PathVariable Long id) {
        Dorm dorm = dormService.getDormById(id);
        return ResponseEntity.ok(dorm);
    }

    @PostMapping
    public ResponseEntity<Dorm> createDorm(@RequestBody Dorm dorm) {
        Dorm createdDorm = dormService.createDorm(dorm);
        return ResponseEntity.status(201).body(createdDorm);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Dorm> updateDorm(@PathVariable Long id, @RequestBody Dorm dorm) {
        Dorm updatedDorm = dormService.updateDorm(id, dorm);
        return ResponseEntity.ok(updatedDorm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDorm(@PathVariable Long id) {
        dormService.deleteDorm(id);
        return ResponseEntity.noContent().build();
    }
}