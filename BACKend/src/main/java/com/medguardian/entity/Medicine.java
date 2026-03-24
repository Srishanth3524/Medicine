
package com.medguardian.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Medicine {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;

 private String name;
 private String category;
 private String batchNumber;
 private LocalDate manufactureDate;
 private LocalDate expiryDate;
 private int quantity;
 private double price;

 @ManyToOne
 private Supplier supplier;

 public Long getId() { return id; }
 public void setId(Long id) { this.id = id; }

 public String getName() { return name; }
 public void setName(String name) { this.name = name; }

 public String getCategory() { return category; }
 public void setCategory(String category) { this.category = category; }

 public String getBatchNumber() { return batchNumber; }
 public void setBatchNumber(String batchNumber) { this.batchNumber = batchNumber; }

 public LocalDate getManufactureDate() { return manufactureDate; }
 public void setManufactureDate(LocalDate manufactureDate) { this.manufactureDate = manufactureDate; }

 public LocalDate getExpiryDate() { return expiryDate; }
 public void setExpiryDate(LocalDate expiryDate) { this.expiryDate = expiryDate; }

 public int getQuantity() { return quantity; }
 public void setQuantity(int quantity) { this.quantity = quantity; }

 public double getPrice() { return price; }
 public void setPrice(double price) { this.price = price; }

 public Supplier getSupplier() { return supplier; }
 public void setSupplier(Supplier supplier) { this.supplier = supplier; }
}
