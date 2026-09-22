package com.example.dormbooking.service;

import com.example.dormbooking.model.Dorm;
import com.example.dormbooking.repository.DormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DormService {

    private final DormRepository dormRepository;

    @Autowired
    public DormService(DormRepository dormRepository) {
        this.dormRepository = dormRepository;
    }

    public List<Dorm> getAllDorms() {
        return dormRepository.findAll();
    }

    public Optional<Dorm> getDormById(Long id) {
        return dormRepository.findById(id);
    }

    public Dorm createDorm(Dorm dorm) {
        return dormRepository.save(dorm);
    }

    public Dorm updateDorm(Long id, Dorm dormDetails) {
        Dorm dorm = dormRepository.findById(id).orElseThrow(() -> new RuntimeException("Dorm not found"));
        dorm.setName(dormDetails.getName());
        dorm.setLocation(dormDetails.getLocation());
        // Update other fields as necessary
        return dormRepository.save(dorm);
    }

    public void deleteDorm(Long id) {
        dormRepository.deleteById(id);
    }
}