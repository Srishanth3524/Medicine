
package com.medguardian.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medguardian.entity.Medicine;

public interface MedicineRepository extends JpaRepository<Medicine, Long> {
}
