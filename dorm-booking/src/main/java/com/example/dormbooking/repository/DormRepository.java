package com.example.dormbooking.repository;

import com.example.dormbooking.model.Dorm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DormRepository extends JpaRepository<Dorm, Long> {
    // Additional query methods can be defined here if needed
}