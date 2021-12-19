package com.gmail.merikbest2015.ecommerce.service.Impl;

import com.gmail.merikbest2015.ecommerce.domain.Perfume;
import com.gmail.merikbest2015.ecommerce.domain.Review;
import com.gmail.merikbest2015.ecommerce.domain.Role;
import com.gmail.merikbest2015.ecommerce.domain.User;
import com.gmail.merikbest2015.ecommerce.repository.PerfumeRepository;
import com.gmail.merikbest2015.ecommerce.repository.ReviewRepository;
import com.gmail.merikbest2015.ecommerce.repository.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.gmail.merikbest2015.ecommerce.util.TestConstants.FIRST_NAME;
import static com.gmail.merikbest2015.ecommerce.util.TestConstants.USER_EMAIL;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class UserServiceImlTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PerfumeRepository perfumeRepository;

    @MockBean
    private ReviewRepository reviewRepository;

    @Test
    public void findUserById() {
        User user = new User();
        user.setId(122L);

        when(userRepository.findById(122L)).thenReturn(java.util.Optional.of(user));
        userService.findUserById(122L);
        assertEquals(122L, user.getId());
        verify(userRepository, times(1)).findById(122L);
    }

    @Test
    public void findUserByEmail() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        userService.findUserByEmail(USER_EMAIL);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        assertEquals(USER_EMAIL, user.getEmail());
        verify(userRepository, times(1)).findByEmail(USER_EMAIL);
    }

    @Test
    public void findAllUsers() {
        List<User> usersList = new ArrayList<>();
        usersList.add(new User());
        usersList.add(new User());
        userService.findAllUsers();

        when(userRepository.findAllByOrderByIdAsc()).thenReturn(usersList);
        assertEquals(2, usersList.size());
        verify(userRepository, times(1)).findAllByOrderByIdAsc();
    }

    @Test
    public void getCart() {
        List<Long> perfumeIds = new ArrayList<>(Arrays.asList(2L, 4L));
        Perfume firstPerfume = new Perfume();
        firstPerfume.setId(2L);
        Perfume secondPerfume = new Perfume();
        secondPerfume.setId(4L);
        List<Perfume> perfumeList = new ArrayList<>(Arrays.asList(firstPerfume, secondPerfume));
        userService.getCart(perfumeIds);

        when(perfumeRepository.findByIdIn(perfumeIds)).thenReturn(perfumeList);
        assertEquals(2, perfumeList.size());
        assertEquals(2, perfumeIds.size());
        assertNotNull(perfumeList);
        verify(perfumeRepository, times(1)).findByIdIn(perfumeIds);
    }

    @Test
    public void loadUserByUsername() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setActive(true);
        user.setFirstName(FIRST_NAME);
        user.setRoles(Collections.singleton(Role.USER));

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        assertTrue(user.isActive());
    }

    @Test
    public void updateProfile() {
        User user = new User();
        user.setEmail(USER_EMAIL);
        user.setFirstName(FIRST_NAME);

        when(userRepository.findByEmail(USER_EMAIL)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);
        userService.updateProfile(USER_EMAIL, user);
        assertEquals(USER_EMAIL, user.getEmail());
        assertEquals(FIRST_NAME, user.getFirstName());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void addReviewToPerfume() {
        List<Review> reviewList = new ArrayList<>();
        Review review = new Review();
        review.setRating(5);
        reviewList.add(review);
        Perfume perfume = new Perfume();
        perfume.setId(123L);
        perfume.setReviews(reviewList);

        when(perfumeRepository.getOne(123L)).thenReturn(perfume);
        when(reviewRepository.save(review)).thenReturn(review);
        userService.addReviewToPerfume(review, 123L);
        assertEquals(123L, perfume.getId());
        assertNotNull(perfume.getReviews());
        verify(perfumeRepository, times(1)).getOne(123L);
        verify(reviewRepository, times(1)).save(review);
    }
}
