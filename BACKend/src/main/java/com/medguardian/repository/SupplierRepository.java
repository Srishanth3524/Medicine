
package com.medguardian.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medguardian.entity.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {
}
