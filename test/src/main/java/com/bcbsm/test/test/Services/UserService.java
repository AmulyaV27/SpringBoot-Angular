package com.bcbsm.test.test.Services;

import com.bcbsm.test.test.Repositories.UserRepo;
import com.bcbsm.test.test.models.Review;
import com.bcbsm.test.test.models.User;
import com.bcbsm.test.test.models.UserInfoDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder encoder;
    public User saveUser(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }
    public List<User> getAllUsers(){
        return userRepo.findAll();
    }
    public User getUserById(Long id){
        return userRepo.findById(id).get();
    }
    public List<Review> saveReview(Long id, Review review){
        Optional<User>optionalUser=userRepo.findById(id);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            review.setUser(user);
            user.getUserReviews().add(review);
            userRepo.save(user);
            return user.getUserReviews();
        }
        return null;
    }
    public List<Review> getReviewsByUserId(Long id){
        Optional<User>optionalUser=userRepo.findById(id);
        if(optionalUser.isPresent()){
            User user=optionalUser.get();
            return user.getUserReviews();
        }
        return new ArrayList<>();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> userDetail = userRepo.findByUsername(username);

        // Converting userDetail to UserDetails
        return userDetail.map(UserInfoDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found " + username));
    }
    public User findByUserName(String username){
        return userRepo.findByUsername(username).orElse(null);
    }
}
