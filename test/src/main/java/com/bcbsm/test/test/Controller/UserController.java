package com.bcbsm.test.test.Controller;

import com.bcbsm.test.test.Services.JwtService;
import com.bcbsm.test.test.Services.UserService;
import com.bcbsm.test.test.models.AuthRequest;
import com.bcbsm.test.test.models.Review;
import com.bcbsm.test.test.models.User;
import com.bcbsm.test.test.models.UserResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/sign-up")
    public ResponseEntity<UserResponse> saveUser(@RequestBody User user){
        String token=jwtService.generateToken(user.getUsername());
        return ResponseEntity.ok(new UserResponse(userService.saveUser(user),token));
    }
    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }
    @PostMapping("/{id}/save-review")
    public ResponseEntity<List<Review>> saveReview(@PathVariable Long id,@RequestBody Review review){
        return ResponseEntity.ok(userService.saveReview(id,review));
    }
    @GetMapping("/{id}/review")
    public ResponseEntity<List<Review>>getReviewsById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getReviewsByUserId(id));
    }
    @PostMapping("/login")
    public ResponseEntity<UserResponse>  login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
        if (authentication.isAuthenticated()) {
            UserResponse userResponse=new UserResponse(userService.findByUserName(authRequest.getUsername()),jwtService.generateToken(authRequest.getUsername()));
            return ResponseEntity.ok(userResponse);
        } else {
            throw new UsernameNotFoundException("invalid user request !");
        }
    }
}
