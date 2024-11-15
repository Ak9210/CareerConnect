#include <iostream>
#include <stack>

// Definition for a Node.
struct Node {
    int val;
    Node* prev;
    Node* next;
    Node* child;

    Node(int _val) : val(_val), prev(nullptr), next(nullptr), child(nullptr) {}
};

class Solution {
public:
    Node* flatten(Node* head) {
        if (!head) return head;

        Node* current = head;
        std::stack<Node*> nodeStack;

        while (current) {
            if (current->child) {
                // If there's a next node, push it onto the stack to revisit later
                if (current->next) {
                    nodeStack.push(current->next);
                }

                // Connect current node to its child
                current->next = current->child;
                current->next->prev = current;
                current->child = nullptr;
            }

            // If no next and there are nodes in the stack, pop from the stack
            if (!current->next && !nodeStack.empty()) {
                current->next = nodeStack.top();
                nodeStack.pop();
                current->next->prev = current;
            }

            // Move to the next node in the list
            current = current->next;
        }

        return head;
    }
};

// Helper function to print the flattened list
void printList(Node* head) {
    Node* current = head;
    while (current) {
        std::cout << current->val << " ";
        current = current->next;
    }
    std::cout << "NULL" << std::endl;
}

// Example usage
int main() {
    // Creating the example multilevel doubly linked list
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->prev = head;
    head->next->next = new Node(3);
    head->next->next->prev = head->next;
    head->next->next->next = new Node(4);
    head->next->next->next->prev = head->next->next;
    head->next->next->next->next = new Node(5);
    head->next->next->next->next->prev = head->next->next->next;
    head->next->next->next->next->next = new Node(6);
    head->next->next->next->next->next->prev = head->next->next->next->next;

    head->next->next->child = new Node(7);
    head->next->next->child->next = new Node(8);
    head->next->next->child->next->prev = head->next->next->child;
    head->next->next->child->next->next = new Node(9);
    head->next->next->child->next->next->prev = head->next->next->child->next;
    head->next->next->child->next->next->next = new Node(10);
    head->next->next->child->next->next->next->prev = head->next->next->child->next->next;

    head->next->next->child->next->child = new Node(11);
    head->next->next->child->next->child->next = new Node(12);
    head->next->next->child->next->child->next->prev = head->next->next->child->next->child;

    // Flattening the list
    Solution sol;
    head = sol.flatten(head);

    // Printing the flattened list
    printList(head);

    return 0;
}