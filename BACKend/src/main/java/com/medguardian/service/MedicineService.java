
package com.medguardian.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.medguardian.entity.Medicine;
import com.medguardian.repository.MedicineRepository;

@Service
public class MedicineService {

 private final MedicineRepository repo;

 public MedicineService(MedicineRepository repo) {
  this.repo = repo;
 }

 public Medicine addMedicine(Medicine m){
  return repo.save(m);
 }

 public List<Medicine> getAll(){
  return repo.findAll();
 }

 public void delete(Long id){
  repo.deleteById(id);
 }
}
