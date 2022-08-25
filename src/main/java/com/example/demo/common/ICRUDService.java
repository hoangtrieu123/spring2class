package com.example.demo.common;

import java.util.List;
import java.util.Optional;

public interface ICRUDService<E> {
    E save(E e);

    Optional<E> findById(Long id);

    List<E> findAll();

    void delete(Long id);
}
